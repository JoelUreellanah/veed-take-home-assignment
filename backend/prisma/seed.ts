import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync(__dirname + '/videos.json', 'utf-8')).videos;

async function main() {
  await prisma.video.deleteMany();
  for (const video of data) {
    await prisma.video.create({ data: video });
  }
  console.log('Database seeded!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());