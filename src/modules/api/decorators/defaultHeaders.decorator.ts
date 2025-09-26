import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

import { KnownHeaders } from "../../../common/constants";

export const DefaultHeaders = () => {
  return applyDecorators(
    ApiHeader({ name: KnownHeaders.Version, example: "1", required: false })
  );
};
