import type Hotel from '@/domain/entities/Hotel'

export const hotels: Hotel[] = [
  {
    id: 1,
    title: 'Sunset Beach Hotel',
    subtitle: 'Relax and unwind at our luxurious beachfront resort.',
    description: 'Our hotel is located on the beautiful Sunset Beach, where you can enjoy stunning sunsets and a wide range of water activities. Our luxurious rooms and suites are designed to provide the ultimate comfort and relaxation, with breathtaking views of the ocean.',
    address: '1234 Sunset Blvd, Sunset Beach, CA',
    rating: {
      votesCount: '2.4K',
      rating: 4.6,
      stars: 4,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Beachfront',
    },
    chart: {
      place: 3,
      category: 'Beachfront',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: 'https://picsum.photos/id/1015/800/600',
    rooms: [
      {
        id: 1,
        title: 'Deluxe Ocean View Room',
        subtitle: 'Enjoy stunning ocean views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: 'https://picsum.photos/id/1015/800/600',
      },
      {
        id: 2,
        title: 'Luxury Suite',
        subtitle: 'Indulge in luxury and sophistication in our spacious suites.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: 'https://picsum.photos/id/1018/800/600',
      },
    ],
  },
  {
    id: 2,
    title: 'Mountain View Lodge',
    subtitle: 'Escape to the mountains and enjoy stunning views and fresh air.',
    description: 'Our lodge is nestled in the heart of the mountains, surrounded by breathtaking views and fresh air. Our cozy rooms and cabins are designed to provide the ultimate comfort and relaxation, with rustic decor and modern amenities.',
    address: '5678 Mountain Rd, Mountain View, CO',
    rating: {
      votesCount: '1.7K',
      rating: 4.3,
      stars: 4,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Mountain View',
    },
    chart: {
      place: 1,
      category: 'Mountain View',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: 'https://picsum.photos/id/1018/800/600',
    rooms: [
      {
        id: 1,
        title: 'Cozy Cabin',
        subtitle: 'Experience the great outdoors in our cozy cabins.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: 'https://picsum.photos/id/1018/800/600',
      },
      {
        id: 2,
        title: 'Mountain View Suite',
        subtitle: 'Enjoy stunning mountain views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: 'https://picsum.photos/id/1015/800/600',
      },
      {
        id: 3,
        title: 'Rustic Room',
        subtitle: 'Experience the rustic charm of our cozy rooms.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: 'https://picsum.photos/id/1018/800/600',
      },
    ],
  },
  // Add more hotels here...
]

// export const _hotels: Hotel[] = [
//   {
//     id: 1,
//     title: 'Sunset Beach Hotel',
//     subtitle: 'Relax and unwind at our luxurious beachfront resort.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 2,
//     title: 'Mountain View Lodge',
//     subtitle: 'Escape to the mountains and enjoy stunning views and fresh air.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 3,
//     title: 'City Center Suites',
//     subtitle: 'Experience the heart of the city in our modern and stylish suites.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 4,
//     title: 'Tropical Paradise Resort',
//     subtitle: 'Discover the beauty of the tropics at our all-inclusive resort.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 5,
//     title: 'Historic Inn & Spa',
//     subtitle: 'Step back in time and indulge in luxury at our historic inn and spa.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 6,
//     title: 'Seaside Villas',
//     subtitle: 'Experience the ultimate beach vacation in our private seaside villas.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 7,
//     title: 'Rustic Cabins',
//     subtitle: 'Get away from it all and enjoy the great outdoors in our cozy cabins.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 8,
//     title: 'Luxury Suites',
//     subtitle: 'Indulge in luxury and sophistication in our spacious suites.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 9,
//     title: 'Safari Lodge',
//     subtitle: 'Embark on a wild adventure and stay in our authentic safari lodge.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
//   {
//     id: 10,
//     title: 'Coastal Retreat',
//     subtitle: 'Escape to the coast and enjoy breathtaking views and fresh seafood.',
//     price: Math.floor(Math.random() * 311) + 90,
//     picture: '',
//   },
// ]
