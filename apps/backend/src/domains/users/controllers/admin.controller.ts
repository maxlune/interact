// import { RequestHandler } from 'express';
//
// import { UserRepository } from '../../../repositories/user.repository';
// import { CustomRequest } from '../../../types/express';
// import { response } from '../../../utils/response';
//
// export const getAllUsers: RequestHandler = async (
//   req: CustomRequest,
//   res: Response,
// ) => {
//   try {
//     const userRepository = new UserRepository();
//     const users = await userRepository.getAllUsersWithRole();
//
//     response(res, {
//       statusCode: 200,
//       message: 'Users retrieved successfully',
//       data: users,
//     });
//   } catch (error) {
//     console.error(error);
//     response(res, {
//       statusCode: 500,
//       message: 'Internal server error',
//     });
//   }
// };
