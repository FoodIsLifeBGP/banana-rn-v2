import railsAxios from '@util/railsAxios';

export const getActiveDonationsForClient = async (store) => {
  const { jwt, user } = store.state;
  if (!user.coords) {
    return [];
  }
  const endpoint = `/donations/active?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;
  try {
    const response = await railsAxios(jwt).get(endpoint);
    const { data } = response;
    const sortedData = data.sort((a, b) => a.created_at < b.created_at);
    if (sortedData) {
      const activeDonations = sortedData.filter((donation) => donation.status === 'active');
      await store.setState({ donationsOrClaims: activeDonations });
      return sortedData;
    }
  } catch (error) {
    console.log(error);
  }
  await store.setState({ donationsOrClaims: [] });
  return [];
};


// TODO: started on this below, but it's not working yet
// import { GlobalState } from '@state/index';
// import railsAxios from '@util/railsAxios';

// export const getActiveDonationsForClient = (state: GlobalState): GlobalState => {
//   const { jwt, user } = state;

//   if (user) {
//     if ('coords' in user && user.coords) {
//       const endpoint = `/donations/active?client_lat=${user.coords.latitude}&client_long=${user.coords.longitude}`;

//       const getActiveDonationsAsync = async () => {
//         try {
//           const response = await railsAxios(jwt).get(endpoint);
//           const { data } = response;

//           const sortedData = data.sort((a, b) => a.created_at < b.created_at);
//           if (sortedData) {
//             const activeDonations = sortedData.filter((donation) => donation.status === 'active');
//             return {donationsOrClaims: activeDonations};
//             return sortedData;
//           }
//         } catch (error: any) {
//           console.log(error);
//           return {[]};
//         }
//         return [];
//       };

//       getActiveDonationsAsync();
//     } else {
//       return {donationsOrClaims: []};
//     }
//   }

//   return state;
// };

// export default getActiveDonationsForClient;
