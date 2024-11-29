import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../domain/user";

export class AuthService {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async register(email: string, password: string) {
    const existingUser = await this.userRepo.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepo.createUser({ email, password: hashedPassword });
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid credentials");

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return token;
  }
}
