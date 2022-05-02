import * as React from "react"
import { Link, graphql } from "gatsby"
import DummyFunc from "gatsby-source-storyblok"
import configuration from '../../gatsby-config'
import { storyblokInit, apiPlugin, StoryblokComponent, storyblokEditable } from "@storyblok/react"
import { useStoryblok } from 'gatsby-source-storyblok'
import Teaser from '../components/Teaser'
import Grid from '../components/Grid'
import Feature from '../components/Feature'

import Layout from "../components/layout"
import Seo from "../components/seo"

console.log(DummyFunc())

const sbConfig = configuration.plugins.find((item) => item.resolve === 'gatsby-source-storyblok')

storyblokInit({
  accessToken: sbConfig.options.accessToken,
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    grid: Grid,
    feature: Feature
  }
});

const IndexPage = ({ data }) => {
  console.log(data)
  let story = data.storyblokEntry
  story = useStoryblok(story)

  const components = story.content.body.map(blok => (<StoryblokComponent blok={blok} key={blok._uid} />))

  return (
    <Layout>
      <div {...storyblokEditable(story.content)}>
        <Seo title="Home" />
        <h1>{story.name}</h1>
        {components}
        <p>
          <Link to="/page-2/">Go to page 2</Link> <br />
          <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />
          <Link to="/using-ssr">Go to "Using SSR"</Link> <br />
          <Link to="/using-dsg">Go to "Using DSG"</Link>
        </p>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    storyblokEntry(full_slug: { eq: "gatsby/" }) {
      content
      name
      full_slug
      uuid
      id
    }
  }
`