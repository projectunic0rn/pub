---
title: 'Learnings from Geornal'
author: rmoran
date: '2020-05-06'
image: ./hero.png
tags:
  - Geornal
  - Project Learnings
---

Starting a project and seeing it through to the end isn't easy - so we like to highlight teams that are able to stick it through and take a project from idea to production. After a few months of building, today Matt launches [Geornal](https://geornal.herokuapp.com/)!

Matt answered a few questions about the challenges he faced building his project and also shares some solid advice for other devs building their own projects. Take a look at his advice below and check out his project. You can create your own map - [here's mine](https://geornal.herokuapp.com/public/roymoran).

**What is Geornal?**

_"Geornal is a map-based website which allows users to showcase cities they have been or will travel to on an interactive map and record memories (reviews) of the specific things they have done in their travels. The main goal of the project is to provide a resource which will help guide people's trips by letting them learn from the experiences and reviews of people they actually know. The main tool the site uses to do this is a zoomable world map which compiles all of your friend's entered cities onto one screen (see above), a feature that thus far I haven't seen on another modern site. For instance, if I want to travel to Rome, I would be able to click Rome and see that 8 friends have been there and they have left a combined 36 reviews of meals, tours, activities, etc. that I could read to help me choose what I will do when I visit._

_In the beta version currently available I am just having all Project Unicorn users automatically be "friends" with each other as we are just looking for usability feedback, bugs, etc. at the moment and less about the actual reviews/data on the site. If I am honest, I think there is still quite a ways to go to be site ready for the public to use (responsiveness, security, styling) and a number of features to be added but I felt the site was at a spot where the core features are (hopefully) working and it would be good to get some feedback from people who would be a little more understanding of bugs and imperfections. In terms of tech, the site has been built using React, a variety of map-based libraries/tools, and uses an Apollo/GraphQL backend."_

**What went well? What didn't go well? And what would you do differently?**

_"I think the most important thing is to pick a project that you really find interesting and are invested in. There are going to be aspects of it that are tedious and are frustrating along the way, so making sure the content itself is interesting or at least fun to look at was helpful._

_So I think what went well was having an interest in maps, geography, and travel reviews which made it easier to continue slogging through features that weren't working because I knew that with enough effort the site would be something I'd actually want to use and maybe other people would too. And while there were a lot of people in and out of the project, I was fortunate to have someone at the beginning of the project to bounce ideas off of and to start the backend code as well as a number of people along the way who worked on the frontend and were able to add features I didn't know how to implement._

_In terms of the project itself though I'd say the hardest part, as it probably is for most online, work-for-free projects, is retention of people and getting them to follow through on tasks. I know that I am not a project manager by any means and I'm sure made a bunch of mistakes in this area but this can be difficult. The main thing I learned was to give smaller tasks and check in with people more often. If I were to do it over again I would have setup a standing weekly or bi-weekly meeting that acts as a deadline for people's work to be complete._

_Aside from the project management stuff above I'd say that in terms of the site itself having a more complete design in Figma/Adobe XD prior to jumping in to coding would have saved some time and re-writing code. Other than that I'd say that I should have taken the time to learn about testing as it would have made the bug catching we are going through now much easier."_

**What new things did you learn for the project and would you use them again? (Tech, Concepts, etc.)**

_"There were a bunch of things that I hadn't used prior to making this project. We used Figma for design and while I don't like it as much as Adobe XD in terms of doing the actual design work, the fact that it is online and I can work on it on any computer was a major plus since I could use it when there was downtime at work and means I will continue using it._

_GraphQL/Apollo were completely new and I still probably couldn't start a project from scratch without a tutorial but I can, with some trial and error, generally get what I want to happen done now. I think the best thing about GraphQL is the ability to just type exactly what you want to request and not have to deal with a bunch of SQL statements -- I think it is intuitive once you get the relationships among your tables working correctly and I would use it again._

_And then I knew nothing about deployment, now I know the bare minimum to get a full-stack project onto the internet using Heroku and I am happy about that. I will continue using Heroku until I am ready to dive into the more complicated deployment/maintenance tools out there."_

**What's your advice to other devs building their own project?**

_"I'd say taking the time at the beginning of the project to have a meeting or two purely brainstorming the concept with perhaps a few wireframes, then a followup meeting discussing a drafted Figma/Adobe XD design is worthwhile no matter what as it would help everyone get on the same page with the goals of the site itself and the likely work it will entail. I was worried about losing some people's interest by doing too much of this "pre-work" without opening a code editor at all but in hindsight I think the people who want to jump straight to coding and will lose interest if that doesn't happen are the same ones who are likely to lose interest sometime later anyways. But the people who are likely to stick with the project may get frustrated if the upfront discussion/design work isn't done and they start coding features that never get used or weren't quite what the group wanted because the concept wasn't clear enough._

_Another thing that was helpful was doing some research on projects similar to yours as well as the options for libraries and tools that you might need to use in your site. For us, we had to pick between a number of React-based map libraries and were able to find one which used a free map data source but still had good documentation and plenty of examples. And then other than that I'd say do your best to be patient as you try to learn new languages/concepts and are working with people doing the same thing. I know there have been multiple times where I caused some issues by not quite knowing what I was doing with git -- having somebody walk me through the solution and how the problem arose was very helpful and is what I think this group should be about as this is ultimately an opportunity for people to work on projects which don't have financially-based deadlines or metrics so they are allowed to make mistakes and learn from them without major consequences."_
