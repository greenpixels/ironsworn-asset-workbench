/** @format */

import { News } from "../components/News/News";
import dayjs from "dayjs";

export function PageNews() {
  return (
    <div className="flex w-full">
      <News
        date={dayjs()}
        message="Hey there! 😃 Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
        title="Ironbench joins the scene!"
      />
    </div>
  );
}
