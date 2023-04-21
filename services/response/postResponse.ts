export const partialAllPostsResponse = {
  id: true,
  title: true,
  description: true,
  imageUrl: true,
  isActive: true,
  dateStart: true,
  countries: true,
};

export const partialCountryTodaysPostsResponse = {
  ...partialAllPostsResponse,
  foregroundColor: true,
  backgroundColor: true,
};
