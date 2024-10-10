import { Request, Response } from "express"
import PasswordHelper from "../../helpers/PasswordHelper"
import StudentController from "../StudentController"
import EmailController from "../EmailController";

jest.mock("../EmailController");

describe('Student Controller', () => {
    test('Should creane a student', async () => {
      const request: any= {
        body: {
            code: undefined,
            name: "Joao",
            email: "joao@gmail.com",
            password: "1234",
            hashedPassword: await PasswordHelper.encrypt('1234')
        }
      }

      const response: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }

      await StudentController.store(request, response);
      expect(EmailController.sendPasswordEmail).toHaveBeenCalledTimes(1);
      expect(EmailController.sendPasswordEmail).toHaveBeenCalledWith(expect.objectContaining({
            code: request.body.code,
            name: request.body.name,
            email: request.body.email,
            password: request.body.hashedPassword,
            user_type: "student",
      }), request.body.password);

      expect(response.json).toHaveBeenCalledWith({
        message: "Aluno criado",
        user: expect.objectContaining({
            code: request.body.code,
            name: request.body.name,
            email: request.body.email,
            password: request.body.hashedPassword,
            user_type: "student",
        }),
      })
    })
})