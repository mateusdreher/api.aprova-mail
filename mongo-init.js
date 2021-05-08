db.createUser({
  user: 'aprova',
  pwd: 'Passw0rd',
  roles: [
    {
      role: 'readWrite',
      db: 'aprova-mail',
    },
  ],
});
