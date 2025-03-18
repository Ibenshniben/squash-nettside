const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // List of admin users to create
  const adminUsers = [
    { name: 'Admin User 1', email: 'admin1@somsquash.no', password: 'securePassword1' },
    { name: 'Admin User 2', email: 'admin2@somsquash.no', password: 'securePassword2' },
    { name: 'Admin User 3', email: 'admin3@somsquash.no', password: 'securePassword3' },
  ];

  console.log('Starting to create admin users...');

  for (const user of adminUsers) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log(`User ${user.email} already exists, updating to admin role...`);
      await prisma.user.update({
        where: { email: user.email },
        data: { role: 'ADMIN' },
      });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      // Create the user with admin role
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      console.log(`Created admin user: ${user.email}`);
    }
  }

  console.log('Admin users created successfully!');
}

main()
  .catch((e) => {
    console.error('Error creating admin users:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });