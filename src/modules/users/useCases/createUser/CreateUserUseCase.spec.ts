import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("shoud be able create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Name test",
      email: "test@email.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("shoud not be able create a new user with email alread existing", async () => {
    const user = {
      name: "Name test",
      email: "test@email.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new CreateUserError()
    );
  });
});
