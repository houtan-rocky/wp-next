import { gql } from "@apollo/client";
import client from "client";

export default function Home(props) {
  if(!props.data) return <p>loading...</p>

  const pages = props.data.pages.nodes

  return pages.map((p) => {
    return p.title
  })
}

export const getStaticProps = async () => {
  console.log(process.env.WP_GRAPHQL_URL, 'ggg')
  
  const res = await client
    .query({
      query: gql`
        query NewQuery {
          pages {
            nodes {
              title
            }
          }
        }
      `,
    })
    .catch((er) => console.error(er));

    console.log('res', res)

  const data = res?.data ?? "";

  return {
    props: {
      data,
    },
  };
};
