# Shiddit - A reddit clone

A simple social media platform made as a school project.
The goal of this project is to recreate the core experience of Reddit - user profiles, communities, commenting, voting.

Below are a few demo videos showcasing the main features of Shiddit.

## Demo videos

### 1. Login and Profile customization

This video showcases the basic log in proccess and profile picture upload. After logging in the user can make new communities (which will be showed below) join other communities and create posts under their profile or a joined community.

![Login Demo](../assets/login.gif?raw=true)

### 2. Creating a Community

This video show the community creation form. The community names are unique and get checked for. Can also add a banner and an icon if you like.

![Creating Community Demo](../assets/create-community.gif?raw=true)

### 3. Posting, Commenting, Voting, Editing and Deleting

Here we can see that we can create a new post under the created community:

- Can add a new comment (we can also reply to that comment but it isnt shown).
- Can vote (upvote/downvote) the post and comment.
- Can edit the post.
- Can delete the post.

![Posting Demo](../assets/community-interaction.gif?raw=true)

## 🛠 Built With

![Shiddit](https://github-readme-tech-stack.vercel.app/api/cards?title=Shiddit&lineCount=1&hideTitle=true&bg=%230D1117&badge=%23161B22&border=%2321262D&titleColor=%2358A6FF&line1=Laravel%2CLaravel%2Ccb2e2e%3Breact%2CReact%2C3fd4d9%3BMariaDb%2CMariaDB%2Cffffff%3BDocker%2CDocker%2C4a55f7%3B)

## Starting project
Follow these steps to get the project started.

1. `git clone git@github.com:PatrickLapik/reddit-clone.git`
2. `composer install && npm i`
3. `cp .env.example .env`
4. `php artisan key:generate`
5. `npm run build`
6. `./vendor/bin/sail up -d`
7. `./vendor/bin/sail npm run dev`
8. `./vendor/bin/sail artisan migrate --seed`
9. `http://localhost:80` :)
