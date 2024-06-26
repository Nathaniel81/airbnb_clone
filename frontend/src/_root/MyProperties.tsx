import NoItem from "@/components/NoItem";
import PropertyCard from "@/components/PropertyCard";
import SkeletonLoading from '@/components/loaders/SkeletonLoading';
import { useGetUserProperties } from "@/lib/react-query/queries";
import { setMyProperties } from '@/redux/state';
import { RootState } from "@/redux/store";
import { IProperty } from "@/types";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const MyProperties = () => {
   const { data, isSuccess, isPending } = useGetUserProperties();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector((state: RootState) => state.userInfo);
   const myProperties = user?.myProperties ?? [];

   useEffect(() => {
    if (!user) {
        navigate('/')
    }
    if (isSuccess && data) {
      dispatch(setMyProperties(data));
    }
  }, [isSuccess, data, dispatch, navigate, user]);

  if (isPending) {
    return <SkeletonLoading />
  }

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {myProperties?.length === 0 ? (
        <NoItem
          description="You haven't listed any homes yet. Once you do, they'll appear right here!"
          title="You don't have any homes listed yet"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {myProperties?.map((property: IProperty) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyProperties;
