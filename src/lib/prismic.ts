import * as prismic from "@prismicio/client"
import { PRISMIC_REPO_NAME } from "astro:env/server"

export const client = prismic.createClient(PRISMIC_REPO_NAME)
