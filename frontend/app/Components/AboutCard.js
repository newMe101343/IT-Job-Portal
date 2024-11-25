import Image from 'next/image';

const AboutCard = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">Technologies Used</h1>

          {/* <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt, laudantium quia
            tempore delect
          </p> */}
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
          <div>
            <div className="relative z-10 w-full h-96 rounded-md overflow-hidden">
              <Image
                src="/MongoDB.jpg"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p className="font-semibold text-gray-800 dark:text-white md:text-xl">
                MongoDB
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                MongoDB is a popular open-source NoSQL database designed for scalability and flexibility, using a document-based data model to handle diverse data types efficiently.
              </p>

              <p className="mt-3 text-sm text-blue-500">MongoDB, Inc.</p>

            </div>
          </div>

          <div>
            <div className="relative z-10 w-full h-96 rounded-md overflow-hidden">
              <Image
                src="/NextJS.avif"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p className="font-semibold text-gray-800  dark:text-white md:text-xl">
                NextJS
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                Next.js is a powerful React framework that enables server-side rendering, static site generation, and optimized performance for  web applications.
              </p>

              <p className="mt-3 text-sm text-blue-500">Vercel</p>
            </div>
          </div>
        </div>

        <br />

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
          <div>
            <div className="relative z-10 w-full h-96 rounded-md overflow-hidden">
              <Image
                src="/Express.png"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p className="font-semibold text-gray-800 dark:text-white md:text-xl">
                ExpressJS
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications, simplifying server-side development.
              </p>

              <p className="mt-3 text-sm text-blue-500">StrongLoop</p>

            </div>
          </div>

          <div className=''>
            <div className="relative z-10 w-full h-96 border-2 rounded-md overflow-hidden border-zinc-400">
              <Image
                src="/Python.png"
                alt="Blog post image"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
              <p className="font-semibold text-gray-800  dark:text-white md:text-xl">
                Python
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                Python is a versatile programming language known for its simplicity and readability, widely used in web development, data analysis, artificial intelligence, and scientific computing.
              </p>

              <p className="mt-3 text-sm text-blue-500">Python Core</p>

            </div>
          </div>
        </div>
      </div>



      <div className="container px-6 py-6 mx-auto">





      </div>


    </section>
  );
};

export default AboutCard;
