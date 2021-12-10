import { apolloClient } from "../../graphql";
import { GET_ANIME_PAGE } from "./queries";
import { GetAnimePage } from "./__generated__/GetAnimePage";

class AnimeService {
  async getAnimePage(page: Number, perPage = 5): Promise<GetAnimePage["Page"]> {
    try {
      const res = await apolloClient.query({
        query: GET_ANIME_PAGE,
        variables: { page, perPage },
      });

      if (!res || !res.data) throw new Error("Cannot fetch anime list");
      return res.data.Page;
    } catch (err) {
      throw err;
    }
  }
}

export default new AnimeService();
