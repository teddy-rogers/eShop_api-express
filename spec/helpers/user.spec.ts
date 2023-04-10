// import {
//   mockInputsCredentials,
//   mockInvalidsInputsCredentials,
//   mockUser,
//   mockUserCart,
// } from '../mocks';
// import { UserHelpers } from '../../helpers';
// import { mockProduct, mockSku } from '../mocks/';
//
// const { credentialsInputsValidation, populateUserCart } = new UserHelpers();
//
// describe('user', () => {
//   describe('inputs validation', () => {
//     it('should throw an error if inputs are invalid for submission', async () => {
//       const { email, password } = mockInvalidsInputsCredentials;
//       await expectAsync(
//         credentialsInputsValidation(email, password),
//       ).toBeRejectedWith('email and password are not valid.');
//     });
//
//     it('should return if inputs are valid', async () => {
//       const { email, password } = mockInputsCredentials;
//       await expectAsync(
//         credentialsInputsValidation(email, password),
//       ).toBeResolved();
//     });
//   });
//
//   describe('createUser cart', () => {
//     it("should return createUser's cart", () => {
//       const skus = [mockSku1, mockSku2];
//       const products = [mockProduct1];
//       expect(populateUserCart(mockUser.cart, skus, products)).toEqual(
//         mockUserCart,
//       );
//     });
//   });
// });
