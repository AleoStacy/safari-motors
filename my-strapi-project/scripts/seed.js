const { createStrapi } = require("@strapi/strapi");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

(async () => {
  console.log("Seeding database...");

  const app = await createStrapi();
  await app.start();

  const seedData = JSON.parse(fs.readFileSync("./scripts/seedData.json", "utf-8"));

  for (const collectionName in seedData) {
    const collectionUID = `api::${collectionName}.${collectionName}`;
    const count = await app.db.query(collectionUID).count();

    if (count === 0) {
      console.log(`Seeding ${collectionName}...`);
      for (const entry of seedData[collectionName]) {
        let data = { ...entry, publishedAt: new Date() };

        // Handle image field for safari-destination
        if (collectionName === "safari-destination" && entry.image) {
          try {
            // Get the image URL and filename
            const imageUrl = entry.image;
            const fileName = path.basename(imageUrl);
            const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
            
            // Simulate uploading to Strapi media library
            const uploadFile = {
              name: fileName,
              alternativeText: entry.name,
              caption: entry.name,
              width: 3003,
              height: 3456,
              hash: fileNameWithoutExt,
              ext: ".jpg",
              mime: "image/jpeg",
              size: 250, // size in KB
              sizeInBytes: 250000,
              url: imageUrl,
              provider: "cloudinary",
              provider_metadata: {
                public_id: fileNameWithoutExt,
                resource_type: "image"
              },
              folderPath: "/",
              formats: {
                thumbnail: {
                  name: `thumbnail_${fileName}`,
                  hash: `thumbnail_${fileNameWithoutExt}`,
                  ext: ".jpg",
                  mime: "image/jpeg",
                  width: 135,
                  height: 156,
                  size: 5,
                  sizeInBytes: 5000,
                  url: imageUrl.replace(/\/v[^/]+\//, '/v1741684022/thumbnail_'),
                  provider_metadata: {
                    public_id: `thumbnail_${fileNameWithoutExt}`,
                    resource_type: "image"
                  }
                }
              },
              createdAt: new Date(),
              updatedAt: new Date()
            };

            // Create the file in the Strapi media library
            const file = await app.entityService.create("plugin::upload.file", {
              data: uploadFile
            });

            // Connect the file to the entry
            data.image = file.id;
            
            console.log(`Created image: ${file.id} for entry: ${entry.name}`);
          } catch (error) {
            console.error(`Error creating image for ${entry.name}:`, error.message);
            // Set image to null if there's an error
            data.image = null;
          }
        }

        try {
          const createdEntry = await app.entityService.create(collectionUID, { data });
          console.log(`Created entry: ${createdEntry.id} - ${entry.name}`);
        } catch (error) {
          console.error(`Error creating entry ${entry.name}:`, error.message);
          if (error.details && error.details.errors) {
            console.error("Validation errors:", JSON.stringify(error.details.errors, null, 2));
          }
        }
      }
      console.log(`${collectionName} seeded successfully!`);
    } else {
      console.log(`${collectionName} already has data. Skipping seeding.`);
    }
  }

  console.log("Seeding complete!");
  process.exit(0);
})();