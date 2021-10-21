# FE5-Hackathon

Project Minimalist Anime Watch-list Management

Convention to Follow
Classname = CAPITAL LETTER on 1st character of each word (exp: AnimeCharacter, AnimeTitle)
Function = CAPITAL LETTER on 1st character of each word (exp: AnimeCharacter, AnimeTitle)
Variable (let) = small letter on 1st character, big letter on 1st character of consecutive word (exp: animeChacter, animeTitle)
Constant (const) = EVERY LETTER TO BE CAPTITAL (exp: ANIMECHARACTER, ANIMETITLE)
React component file = Dash-line between each word (exp: anime-character, anime-title)
CSS naming (id and classname) = Underscore line between word (exp: anime_character, anime_title)

API and Documentation: https://jikan.moe/

GIT Tutorial

\*\*NOTE, Always, develope on your OWN branch, pull request when you want to merge into master
<--> This indicate comment why this command is used, don't include in actual command.
There are configuration where 'master' is used instead of 'main', if 'main' don't work, use 'master'

Pull request is to be done on GIT HUB website.

1. How to get updated files from repo?

   > git fetch --all <--> To get lastest changes
   > git status <--> To view current branch status
   > git branch <--> To ensure you're on the right branch
   > git checkout your_branch_name <--> ONLY IF NOT ON CORRECT BRANCH
   > git pull origin your_branch_name

2. How to commit and push to your branch

   > git branch <--> Ensure on correct branch
   > git status <--> Check what file is untracked, modified, staged, unstaged
   > git add -A <--> Add all untracked and modified file to staging area
   > git commit -m "your_message"
   > git push origin your_branch_name

3. How to update your current branch with the updated master branch (Merging)

   > git checkout main
   > git fetch --all <--> get latest changes
   > git pull origin main <--> This update your local main
   > git checkout your_branch_name

   ALTERNATIVE AVAILABLE

   > git merge main your_branch_name <--> This merge your updated main/master branch to your current branch, locally
   > OR THE OTHER WAY IS
   > git pull origin main <--> Please ensure you are on your current branch to work, this merge using online repo's main to your local branch instead of locally. Best practice is to always keep your local main branch updated anyhow.

4. How to make new branch?
   > git checkout -b your_branch_name
   > API: https://jikan.moe/

Have resized the image, transfer SignInSignUp into components folder.
