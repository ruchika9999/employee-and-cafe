import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import SearchAddress from "../Common/Inputs/SearchAddress";
import { FieldConstant } from "../../utils/constant";
import { CafeLocationType } from "../../utils/types";
import { fetchCafesRequest } from "../../store/cafes/actions";

const SearchCafe = () => {
  const methods = useForm<CafeLocationType>();
  const dispatch = useDispatch();

  // const debounce = <T extends unknown[]>(
  //   callBack: (...args: T) => void,
  //   time: number
  // ) => {
  //   let timer: NodeJS.Timeout;
  //   return (...args: T) => {
  //     clearTimeout(timer);

  //     timer = setTimeout(() => {
  //       callBack(...args);
  //     }, time);
  //   };
  // };

  // const handleValueChange = debounce((value: string) => {
  //   dispatch(fetchCafesRequest(value));
  // }, 1000);

  // if you want to use debounce, uncomment the above code and comment the below code

  const handleValueChange = (value: string) => {
    dispatch(fetchCafesRequest(value));
  };

  return (
    <FormProvider {...methods}>
      <SearchAddress
        fieldName=""
        name={FieldConstant.LOCATION}
        placeholder="Search cafe location"
        width={350}
        handleValueChange={handleValueChange}
      />
    </FormProvider>
  );
};

export default SearchCafe;
