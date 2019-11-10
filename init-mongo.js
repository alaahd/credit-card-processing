db.createUser({
  user: "alaa",
  pwd: "alaa",
  roles: [
    {
      role: "readWrite",
      db: "psdatabase"
    }
  ]
});
