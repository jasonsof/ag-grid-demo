import { User } from './types';

const FIRST_NAMES = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah',
  'Isaac', 'Julia', 'Kevin', 'Laura', 'Michael', 'Nina', 'Oscar', 'Paula',
  'Quinn', 'Rachel', 'Samuel', 'Tina', 'Ulysses', 'Vera', 'Walter', 'Xena',
  'Yolanda', 'Zachary', 'Amber', 'Brian', 'Chloe', 'Daniel', 'Emma', 'Frank',
  'Grace', 'Henry', 'Iris', 'Jack', 'Karen', 'Liam', 'Mia', 'Noah', 'Olivia',
  'Peter', 'Quincy', 'Rose', 'Steve', 'Tracy', 'Uma', 'Victor', 'Wendy',
  'Xavier', 'Yvonne', 'Zoe'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts'
];

const DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'protonmail.com', 'mail.com', 'aol.com', 'zoho.com', 'fastmail.com'
];

// Generate a random date within the last 3 years
function randomDate(): string {
  const now = new Date();
  const threeYearsAgo = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
  const randomTime = threeYearsAgo.getTime() + Math.random() * (now.getTime() - threeYearsAgo.getTime());
  return new Date(randomTime).toISOString();
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateUsers(count: number): User[] {
  const users: User[] = [];
  
  for (let i = 1; i <= count; i++) {
    const firstName = randomElement(FIRST_NAMES);
    const lastName = randomElement(LAST_NAMES);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomElement(DOMAINS)}`;
    
    users.push({
      id: i.toString(),
      name,
      email,
      createdAt: randomDate(),
    });
  }
  
  return users;
}

// Generate a fixed dataset of 1000 users
export const MOCK_USERS = generateUsers(1000);
