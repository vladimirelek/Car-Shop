import { Pagination } from "@mui/material";
import { MetaData } from "../../models/pagination";
interface Props {
  metaData: MetaData | null;
  onPageChange: (page: number) => void;
}
const AppPagination = ({ metaData, onPageChange }: Props) => {
  return (
    <Pagination
      size="large"
      count={metaData?.totalPages}
      page={metaData?.currentPage}
      onChange={(e, page) => onPageChange(page)}
    />
  );
};
export default AppPagination;
