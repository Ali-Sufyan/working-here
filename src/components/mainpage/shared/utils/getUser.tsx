/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserQuery } from "../../../../app/services/users/user.query";
import Loading from "../../../utilities/styles/loading";
import { capitalize } from "../../../utilities/utils";

export const GetUserById: React.FC<{
  userId: string;
 
  onDeleteSuccess?: () => void;
}> = ({ userId }) => {
  // const dispatch = useAppDispatch();

  const { isLoading, data, isFetching } = useGetUserQuery(
 userId
  );

  // const tableData = useAppSelector((state) => state.tableData);

  return isLoading || isFetching ? (
    <Loading transparent size={20} />
  ) : (
    <VeriCreatedFX userDetails={data} />
  );
};
 const VeriCreatedFX: React.FC<{
  userDetails: any;
}> = ({ userDetails }) => {
  // const dispatch = useAppDispatch();

  const data = userDetails;
  return (
    <>
      {data &&
        data.firstName &&
        capitalize({
          text: `${data.firstName} ${data.lastName}`,
        })}
    </>
  );
};
