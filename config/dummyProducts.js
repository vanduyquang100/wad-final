const products = [
  {
    name: "Product 1",
    description: "High-quality product for everyday use",
    price: 99999999,
    category: "Electronics",
    imageUrl: "/images/products/img1.png",
    stock: 30,
    detailDescription:
      "Product 1 is crafted with cutting-edge technology to meet all your daily needs in an efficient and reliable way. It combines quality materials with advanced features to deliver outstanding performance, whether you're at work, home, or on the go. The compact design makes it easy to carry and store, while the durable build ensures it stands the test of time. Perfect for users who need a dependable product that doesn’t compromise on style or functionality. This item also includes a one-year warranty to guarantee customer satisfaction and peace of mind.",
  },
  {
    name: "Product 2",
    description: "Durable and reliable choice",
    price: 149999999,
    category: "Home Appliances",
    imageUrl: "/images/products/img2.png",
    stock: 20,
    detailDescription:
      "Product 2 offers durability and reliability, perfect for anyone seeking a dependable appliance in the home. Built with high-quality materials, this product can handle daily wear and tear while maintaining its performance. Whether you use it frequently or occasionally, this product is designed to provide consistent results. Easy to clean and maintain, it’s ideal for busy households where time is valuable. The sleek design adds a modern touch to your kitchen, blending style with function. Enjoy the comfort of knowing this appliance will serve you well for years.",
  },
  {
    name: "Product 3",
    description: "Compact and lightweight design",
    price: 39999999,
    category: "Gadgets",
    imageUrl: "/images/products/img3.png",
    stock: 15,
    detailDescription:
      "Product 3 is designed with portability in mind, making it perfect for travel and on-the-go use. Its compact and lightweight design allows you to easily fit it into any bag without taking up much space. This gadget is made from durable materials that withstand everyday bumps and scratches. Despite its size, it packs plenty of power to get the job done efficiently. It’s an excellent choice for those who value convenience and performance in a compact package, making it a great companion wherever you go.",
  },
  {
    name: "Product 4",
    description: "Perfect for outdoor adventures",
    price: 59999999,
    category: "Outdoors",
    imageUrl: "/images/products/img4.png",
    stock: 25,
    detailDescription:
      "Product 4 is made for the great outdoors. Built to endure rugged terrains and extreme conditions, this product is ideal for adventurers who need reliable gear. It’s designed with durable materials that can withstand rough handling, weather changes, and frequent use. This product is not only functional but also enhances your outdoor experience by providing comfort and convenience. Whether you’re camping, hiking, or exploring, it’s your reliable companion. Its thoughtful design makes it easy to pack, ensuring you have the essentials you need without extra bulk.",
  },
  {
    name: "Product 5",
    description: "Elegant and modern look",
    price: 299999999,
    category: "Furniture",
    imageUrl: "/images/products/img5.png",
    stock: 10,
    detailDescription:
      "Product 5 offers a blend of elegance and modern style, making it a perfect addition to any contemporary space. Its sleek design and fine craftsmanship reflect quality, providing both functionality and aesthetic appeal. Made from durable materials, this furniture piece is designed to last, making it a worthwhile investment for your home. With a comfortable design, it’s ideal for daily use while adding a sophisticated touch to your decor. This piece fits seamlessly into various room styles, from minimalist to traditional, enhancing the beauty of any environment.",
  },
  {
    name: "Product 6",
    description: "Top-rated for durability and style",
    price: 89999999,
    category: "Clothing",
    imageUrl: "/images/products/img6.png",
    stock: 40,
    detailDescription:
      "Product 6 is crafted to combine style and durability, making it a top-rated choice in clothing. Made with high-quality fabrics, it provides both comfort and resilience, perfect for daily wear. The design is stylish and versatile, allowing you to easily incorporate it into your wardrobe. This clothing item is tailored to fit well and move with you, ensuring you feel comfortable throughout the day. It’s an excellent choice for those who want a reliable clothing piece that looks good and lasts, adding a touch of sophistication to your attire.",
  },
  {
    name: "Product 7",
    description: "Perfect for a comfortable night's sleep",
    price: 129999999,
    category: "Bedding",
    imageUrl: "/images/products/img7.png",
    stock: 18,
    detailDescription:
      "Product 7 is designed to provide maximum comfort for a restful night's sleep. Made from high-quality, soft fabrics, it helps create a cozy and inviting sleeping environment. The breathable material ensures optimal temperature regulation, while its durable build withstands frequent washing without losing its softness. Perfect for those who value a good night's rest, this bedding item combines luxury with practicality. Enjoy the feeling of hotel-quality comfort in your own home, making every night a refreshing experience.",
  },
  {
    name: "Product 8",
    description: "All-purpose kitchen essential",
    price: 259999999,
    category: "Kitchen",
    imageUrl: "/images/products/img8.png",
    stock: 50,
    detailDescription:
      "Product 8 is an all-purpose essential for any kitchen, suitable for various cooking and preparation needs. It’s made from durable, food-safe materials and is easy to clean, making it both practical and convenient. The thoughtful design allows for easy handling, ensuring you can use it efficiently in everyday cooking. Ideal for both novice cooks and experienced chefs, it’s versatile enough to handle a range of tasks. This product will save you time and effort in the kitchen, making it a valuable addition to your culinary toolkit.",
  },
  {
    name: "Product 9",
    description: "Portable and powerful audio experience",
    price: 79999999,
    category: "Audio",
    imageUrl: "/images/products/img9.png",
    stock: 35,
    detailDescription:
      "Product 9 delivers an outstanding audio experience with portability in mind. Compact and easy to carry, this audio device is perfect for music lovers on the go. Despite its small size, it provides high-quality sound with powerful bass and clear treble. The battery life is excellent, allowing you to enjoy music for extended periods without frequent charging. It’s compatible with various devices, making it convenient to use anytime, anywhere. Whether you’re at home, outdoors, or traveling, this product elevates your listening experience.",
  },
  {
    name: "Product 10",
    description: "Stylish and comfortable for all-day wear",
    price: 49999999,
    category: "Footwear",
    imageUrl: "/images/products/img10.png",
    stock: 27,
    detailDescription:
      "Product 10 combines style and comfort to create the perfect footwear for all-day wear. Crafted with high-quality materials, it offers durability and support while remaining lightweight. The design is stylish and versatile, suitable for various occasions and outfits. Whether you’re running errands or going out with friends, this footwear provides the cushioning and stability you need. The breathable material keeps your feet cool and dry, ensuring maximum comfort throughout the day. Step out in confidence with this stylish and comfortable pair of shoes.",
  },
  {
    name: "Product 11",
    description: "Perfect blend of quality and affordability",
    price: 19999999,
    category: "Accessories",
    imageUrl: "/images/products/img11.png",
    stock: 60,
    detailDescription:
      "Product 11 offers the perfect blend of quality and affordability, making it a must-have accessory for everyday use. Made from durable materials, it withstands daily wear and tear while maintaining its appearance. The design is sleek and functional, providing easy access to your essentials without compromising style. This accessory is versatile and complements various outfits, adding a touch of sophistication to your look. Whether you’re running errands or attending an event, it’s the ideal accessory to carry your belongings securely and stylishly.",
  },
  {
    name: "Product 12",
    description: "Reliable, high-performance sports gear",
    price: 199999999,
    category: "Sports",
    imageUrl: "/images/products/img12.png",
    stock: 12,
    detailDescription:
      "Product 12 is designed for athletes who demand reliable, high-performance gear to enhance their sports experience. Crafted with advanced materials, this sports equipment offers durability and functionality, ensuring it can withstand intense training and competition. The design is optimized for performance, providing the support and comfort you need to excel in your sport. Whether you’re a professional athlete or a fitness enthusiast, this product delivers the quality and reliability you expect. Elevate your game with this top-of-the-line sports gear.",
  },
  {
    name: "Product 13",
    description: "Ideal for your pet's comfort and safety",
    price: 34999999,
    category: "Pet Supplies",
    imageUrl: "/images/products/img13.png",
    stock: 45,
    detailDescription: `Product 13 is designed to provide comfort and safety for your beloved pet. Made from pet-friendly materials, this product ensures your furry friend has a cozy and secure space to relax. The thoughtful design includes features that cater to your pet’s needs, such as easy access and ventilation. Whether you’re at home or on the go.`,
  },
  {
    name: "Product 14",
    description: "Must-have tool for any DIY project",
    price: 74999999,
    category: "Tools",
    imageUrl: "/images/products/img14.png",
    stock: 22,
    detailDescription:
      "Product 14 is a must-have tool for any DIY project, offering versatility and reliability in one package. Made from durable materials, this tool can handle a variety of tasks with ease, from simple repairs to complex renovations. The ergonomic design ensures comfort and control during use, making it suitable for both beginners and experienced craftsmen. With multiple functions and accessories, it’s the perfect tool to have in your workshop or toolbox. Tackle any project with confidence using this high-quality, dependable tool.",
  },
  {
    name: "Product 15",
    description: "Modern design to fit any space",
    price: 209999999,
    category: "Home Decor",
    imageUrl: "/images/products/img15.png",
    stock: 8,
    detailDescription:
      "Product 15 features a modern design that fits seamlessly into any space, adding a touch of elegance to your home decor. Made from high-quality materials, this home decor item is durable and long-lasting, ensuring it retains its beauty over time. The design is versatile and complements various interior styles, making it a versatile addition to your living space. Whether you place it in the living room, bedroom, or office, it enhances the aesthetic appeal of the room.",
  },
];

export default products;
