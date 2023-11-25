import { Link } from "react-router-dom";
import Container from "../Shared/Container";

const PackagePlans = () => {
  return (
    <div className="my-20">
      <p className="text-center text-primary text-3xl font-bold mb-10">
        Packages
      </p>
      <Container>
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-primary text-white text-center py-10">
            <p className="font-semibold text-xl mb-8 bg-slate-400 py-1">
              Silver
            </p>
            <p>
              <spna className="text-4xl">৳3000 </spna>/mounth
            </p>
            <ul className="mt-10 w-max mx-auto list-disc">
              <li className="text-left text-stone-100 font-semibold text-lg">
                Qualityful Meal
              </li>
              <li className="text-left text-stone-100 font-semibold text-lg">
                24/7 service
              </li>
              <li className="text-left text-stone-100 font-semibold text-lg">
                Cucumber Salad
              </li>
              <del>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  Mounthly Special Meal
                </li>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  One-time Package
                </li>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  Minarel Water
                </li>
                <li className="text-left text-stone-100 font-semibold text-lg">
                  Free Delivery
                </li>
              </del>
            </ul>
            <Link to={`/checkout/${"silver"}`}>
              <button className="transition-all active:scale-90 mt-10 font-semibold bg-white text-primary px-4 py-2 rounded-md">
                Subscribe
              </button>
            </Link>
          </div>
          <div className="bg-primary text-white text-center py-10">
            <p className="font-semibold text-xl mb-8 bg-yellow-500 py-1">
              Gold
            </p>
            <p>
              <spna className="text-4xl">৳4000 </spna>/mounth
            </p>
            <ul className="mt-10 w-max mx-auto list-disc">
              <li className="text-left text-yellow-500 font-semibold text-lg">
                Qualityful Meal
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                24/7 service
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                Cucumber Salad
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                Mounthly Special Meal
              </li>
              <li className="text-left text-yellow-500 font-semibold text-lg">
                One-time Package
              </li>
              <del>
                <li className="text-left text-yellow-500 font-semibold text-lg">
                  Minarel Water
                </li>
                <li className="text-left text-yellow-500 font-semibold text-lg">
                  Free Delivery
                </li>
              </del>
            </ul>
            <Link to={`/checkout/${"gold"}`}>
              <button className="transition-all active:scale-90 mt-10 font-semibold bg-white text-primary px-4 py-2 rounded-md border-2 border-yellow-500">
                Subscribe
              </button>
            </Link>
          </div>
          <div className="bg-primary text-white text-center py-10">
            <p className="font-semibold text-xl mb-8 bg-purple-700 py-1">
              Platinum
            </p>
            <p>
              <spna className="text-4xl">৳5000 </spna>/mounth
            </p>
            <ul className="mt-10 w-max mx-auto list-disc">
              <li className="text-left text-purple-700 font-semibold text-lg">
                Qualityful Meal
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                24/7 service
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Cucumber Salad
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Mounthly Special Meal
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                One-time Package
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Minarel Water
              </li>
              <li className="text-left text-purple-700 font-semibold text-lg">
                Free Delivery
              </li>
            </ul>
            <Link to={`/checkout/${"platinum"}`}>
              <button className="transition-all active:scale-90 mt-10 font-semibold bg-white text-primary px-4 py-2 rounded-md border-2 border-purple-700">
                Subscribe
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PackagePlans;
