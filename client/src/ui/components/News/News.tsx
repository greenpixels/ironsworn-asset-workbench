/** @format */

import Card from "antd/es/card/Card";
import { Dayjs } from "dayjs";

type NewsProps = {
  message: string;
  title: string;
  date: Dayjs;
};

export function News(props: NewsProps) {
  return (
    <Card className="w-fullbreak-words" title={props.title}>
      <p className=" whitespace-pre-wrap ">{props.message}</p>
      <span className="mt-4 text-xs text-gray-400">
        Posted on {props.date.format("DD-MM-YYYY HH:mm")} by Admin
      </span>
    </Card>
  );
}
