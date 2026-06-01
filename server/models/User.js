export default function User(user_id, email, password_hash, salt) {
    this.user_id = user_id;
    this.email = email;
    this.password_hash = password_hash;
    this.salt = salt;
}