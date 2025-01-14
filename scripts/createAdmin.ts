import { registerAdmin } from '../src/services/adminAuth';

async function createAdminUser() {
  const result = await registerAdmin(
    'vitorfribeiro@gmail.com',
    'sua-senha-segura-aqui',
    'Vitor Ribeiro'
  );

  if (result.error) {
    console.error('Failed to create admin:', result.error);
  } else {
    console.log('Admin user created successfully:', result.user);
  }
}

createAdminUser();