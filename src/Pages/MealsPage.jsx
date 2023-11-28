// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const MealsPage = () => {
  const axiosInstance = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sbp, setSbp] = useState("l2h");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["All-Meals", search, category, sbp],
    queryFn: async ({ queryKey, pageParam = 0 }) => {
      const data = await axiosInstance.get(
        `/all-meals?search=${queryKey[1]}&category=${queryKey[2]}&sbp=${queryKey[3]}&page=${pageParam}&limit=6`
      );
      return { ...data.data, prevOffset: pageParam };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 6 > lastPage.count) {
        return false;
      }
      return lastPage.prevOffset + 6;
    },
  });

  const meals = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.meals];
  }, []);
  console.log(meals);

  return (
    <div className="bg[url('/meals.jpg')] bg-fixed bg-cover bg-center">
      <div className="bg[rgba(0,0,0,0.7)]">
        <p className="bg-gradient-to-r from-primary to-secondary text-center text-xl py-2 font-semibold text-white">
          All Meals
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary py-2 flex items-center justify-center gap-6">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="px-4 py-2 rounded-md w-[300px] focus:outline-none"
            type="text"
            name=""
            placeholder="Search by Name"
          />
          <select
            onChange={(e) => setCategory(e.target.value)}
            name=""
            className="px-4 py-2 rounded-md w-[200px] focus:outline-none"
          >
            <option value="all">All</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <select
            onChange={(e) => setSbp(e.target.value)}
            name=""
            className="px-4 py-2 rounded-md w-[200px] focus:outline-none"
            defaultValue={"l2h"}
          >
            <option value="h2l">High to Low</option>
            <option value="l2h">Low to High</option>
          </select>
        </div>
        {!meals ? (
          <Loader />
        ) : (
          // <Container>
          <InfiniteScroll
            dataLength={meals ? meals.length : 0}
            next={() => fetchNextPage()}
            hasMore={hasNextPage}
          >
            <div className="w-[95%] mx-auto grid grid-cols-3 gap-6 my-3">
              {meals &&
                meals.map((meal) => (
                  <Link to={`/meal/${meal._id}`} key={meal._id}>
                    <div className="bg-primary rounded-t-md">
                      <img
                        src={meal.mealImage}
                        className="h-[200px] w-full rounded-t-md"
                        alt=""
                      />
                      <p className="text-center text-white py-2 font-semibold">
                        {meal.mealTitle} - ${meal.price}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </InfiniteScroll>
          // </Container>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
