// import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Container from "../Components/Shared/Container";
import Loader from "../Components/Shared/Loader";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const MealsPage = () => {
  const axiosInstance = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sbp, setSbp] = useState("l2h");
  const [text, setText] = useState("Yay! You have seen it all");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["All-Meals", search, category, sbp],
    queryFn: async ({ queryKey, pageParam = 0 }) => {
      const data = await axiosInstance.get(
        `/all-meals?search=${queryKey[1]}&category=${queryKey[2]}&sbp=${queryKey[3]}&page=${pageParam}&limit=4`
      );
      return { ...data.data, prevOffset: parseInt(pageParam) };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 4 > lastPage.count) {
        return undefined;
      }
      return lastPage.prevOffset + 4;
    },
  });
  console.log(data);

  const meals = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.meals];
  }, []);
  useEffect(() => {
    if (meals?.length == 0) {
      setText("No Found match");
    } else {
      setText("Yay! You have seen it all");
    }
  }, [meals?.length]);

  return (
    <div className="bg[url('/meals.jpg')] bg-fixed bg-cover bg-center">
      <div className="bg[rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-center gap-10 py-4 bg-gradient-to-r from-primary to-secondary">
          <p className="text-center text-xl py-2 font-semibold text-white">
            Total Meals - {data?.pages[0].total}
          </p>
          <p className="text-center text-xl py-2 font-semibold text-white">
            Displayed Meals - {meals?.length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-primary to-secondary py-2 flex items-center justify-center flex-col md:flex-row gap-6">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="px-4 py-2 rounded-md w-[300px] focus:outline-none"
            type="text"
            name=""
            placeholder="Search by Name"
          />
          <div className="flex justify-between gap-4 items-center">
            <select
              onChange={(e) => setCategory(e.target.value)}
              name=""
              className="px-4 py-2 rounded-md w-[150px] md:w-[200px] focus:outline-none"
            >
              <option value="all">All</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
            <select
              onChange={(e) => setSbp(e.target.value)}
              name=""
              className="px-4 py-2 rounded-md w-[150px] md:w-[200px] focus:outline-none"
              defaultValue={"l2h"}
            >
              <option value="h2l">High to Low</option>
              <option value="l2h">Low to High</option>
            </select>
          </div>
        </div>
        {!meals ? (
          <Loader />
        ) : (
          <Container>
            <InfiniteScroll
              dataLength={meals ? meals.length : 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={
                <p className="flex items-center justify-center gap-2 py-2 font-semibold text-white py-5">
                  <ImSpinner9 className="text-3xl animate-spin" />
                  Loading...
                </p>
              }
              endMessage={
                <p className="font-semibold py-10 text-center text-white">
                  {text}
                </p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
                {meals && !data?.pages[0].count == 0 ? (
                  meals.map((meal, i) => (
                    <Link
                      to={`/meal/${meal._id}`}
                      className="w-[90%] mx-auto md:w-auto"
                      key={i}
                    >
                      <div className="bg-primary rounded-t-md">
                        <img
                          src={meal.mealImage}
                          className="h-[200px] w-full rounded-t-md"
                          alt=""
                        />
                        <p className="text-center text-white py-2 font-semibold flex items-center justify-center gap-2">
                          {meal.mealTitle} -
                          <span className="flex items-center gap-1">
                            <FaBangladeshiTakaSign />
                            {meal.price}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </InfiniteScroll>
          </Container>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
