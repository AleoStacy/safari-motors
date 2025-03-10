const { createStrapi } = require("@strapi/strapi");
const fs = require("fs");

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
        await app.entityService.create(collectionUID, { 
          data: { 
            ...entry, 
            publishedAt: new Date() // Ensures the entry is published
          } 
        });
      }
      console.log(`${collectionName} seeded successfully!`);
    } else {
      console.log(`${collectionName} already has data. Skipping seeding.`);
    }
  }

  console.log("Seeding complete!");
  process.exit(0);
})();
