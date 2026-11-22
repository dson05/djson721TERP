# Project 7 - Hosting

## Run locally

1. Put a new MongoDB Atlas connection string in `DeploymentExample/credentialsDontPost/.env` under `MONGO_CONNECTION_STRING`. Use a different connection string from other class projects.
2. Run:

   ```sh
   cd DeploymentExample
   npm ci
   npm start
   ```

3. Open <http://localhost:7003/>. The database routes are `/clearCollection`, `/insertMovies`, and `/listMovies`. `/getSummary` checks the EJS template.

Each visit to `/insertMovies` adds four movies. `/clearCollection` removes the movies, and works when the collection is empty too.

## GitHub and Render

1. Use the **public** GitHub repository [dson05/djson721TERP](https://github.com/dson05/djson721TERP). Upload the contents of this project folder, including `DeploymentExample`, `deploy`, and `render.yaml`. Leave out `node_modules` and `.env` files.
2. In Render, create a Blueprint from the repository using `render.yaml`, or create a Web Service with these settings:

   | Setting | Value |
   | --- | --- |
   | Language | Node |
   | Root Directory | `DeploymentExample` |
   | Build Command | `npm ci` |
   | Start Command | `npm start` |
   | Instance Type | Free |
   | `NODE_ENV` | `production` |
   | `MONGO_CONNECTION_STRING` | The new Atlas connection string, without surrounding quotes |

3. Make sure the Atlas database user can read and write `CMSC335DB`, and allow the Render service's outbound IP addresses in Atlas Network Access.
4. Deploy and test `/clearCollection`, `/insertMovies`, and `/listMovies`, in that order. The list should show four movies. Clear it again and check that the list shows zero movies.

The app reads Render's `PORT` setting and uses Render's environment variables in production.

## TerpConnect page

1. The page in `deploy/index.shtml` uses Daniel Son and repository `https://github.com/dson05/djson721TERP`. The Render service is https://movies-deployment-ej9t.onrender.com and its endpoint links are filled in.
2. From this project folder, copy `deploy` to your TerpConnect public directory:

   ```sh
   scp -r deploy djson721@glue.umd.edu:~/../pub
   ```

   Its address must be `https://www.terpconnect.umd.edu/~djson721/deploy/`.
3. Check every link on that page. Check the GitHub repository in a private browser window to confirm it is public.
4. Run the course's [hosting verification page](https://www.cs.umd.edu/class/fall2026/cmsc335/prot/projects/Hosting/hostingVerification.html) with directory ID `djson721` to check the folder location.

Course instructions: [Render deployment guide](https://www.cs.umd.edu/~nelson/classes/resources/web/renderDeployment/nodejs/) and [TerpConnect upload guide](https://www.cs.umd.edu/~nelson/classes/resources/terpconnect/).
