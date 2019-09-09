---
title: 'FoundIT Retrospective'
author: rickyjw
date: '2019-09-05'
image: ./hero.png
tags:
  - Project Unicorn
  - Retrospective
---

In this post I will talk about my experience building my new project [FoundIT](https://foundit.herokuapp.com) and things I've learned as being a team lead for the first time.

### What Is Project Unicorn

[Project Unicorn](https://projectunicorn.net/) is an online programming community where developers can collaborate together to build applications. Our goal is to bring the development community together where everyone can learn, develop and improve their skills by building meaningful projects together with others who share the same passion.

### FoundIT Overview

[FoundIT](https://foundit.herokuapp.com) is a web application where users can post lost or found items online in hopes of returning it back to its rightful owner. Everybody hates that feeling of reaching into their pockets only to find out that their brand new iPhone X or Gucci wallet has gone missing. Millions of valuable personal items are lost everyday and the development team came up with the idea to create a dedicated website to help solve this issue.

### Tech Stack

Most of the members on the development team were primarily front-end focused, so this was a great opportunity to learn more about back-end development for those that were interested. The tech stack that was used to build FoundIT consisted of:

#### Front End

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Styled Components](https://www.styled-components.com/)
- [Ant Design](https://ant.design/)

#### Back End

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Postgres](https://www.postgresql.org/)
- [CircleCI](https://circleci.com/)
- [Heroku](https://www.heroku.com/)

#### 3rd Party API’s

- [Cloudinary](https://cloudinary.com/documentation/cloudinary_references)
- [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial)
- [IPData](https://ipdata.co/)

#### Project Management/Communication Tools

- [Slack](https://slack.com)
- [Google Docs](https://docs.google.com)
- [Google Hangouts](https://hangouts.google.com/webchat/start)
- [GitHub Project Board](https://github.com/features/project-management/)

#### Design and Wireframe

- [Adobe XD](https://www.adobe.com/ca/products/xd.html)
- [Zeplin](https://zeplin.io/)

### Development Process

The first couple weeks we focused a lot on the core features we wanted to include and also the design of the website. As the team lead of the project, I proposed the idea of having weekly meetings to discuss the ongoing progress of FoundIT. During one of our calls I noticed there were way too many features being proposed and that we needed to drastically narrow it down to something more manageable. By the end of the call we agreed on the following core features that we were going to implement:

- Ability to post, view and search Lost or Found missing items
- Option to upload an image of the item
- Detect user’s location using geolocation
- Display a map of where the item was lost or found
- Focus on a clean simple to use UI and responsive design

The list of features was small but it was enough to cover the core functionality of our web application.

Setting up the front-end side of the application was effortless for the most part. The challenging tasks was setting up the server side code. Nobody on the team had any experience with setting up continuous integration/deployment (CI/CD) or any of the other technologies used in the back-end. This meant countless hours on Youtube, Stack Overflow, blogs, books, documentation and any other sources of information we could get our hands on to help piece the puzzle together. No doubt about it, some of our developers gained a few extra grey hairs.

In order to keep the project moving forward, we used [GitHub's Project Board](https://github.com/features/project-management/) to track and manage our tasks. This was a great alternative to similar project management tools such as [Jira](https://www.atlassian.com/software/jira). Assigning specific tasks to individual members kept everyone accountable for their own work but it also allowed team members know what everyone else was currently working on at the same time.

### What I Learned From This Experience

This was my first time leading a project and I had no idea how to manage a team before. It was definitely tough and a lot of hard work. As the team lead, I wanted to try my best to _lead by example_.

At the end of the day, we were all here to learn and work together as a team while building something we were all really passionate about.

During the early stages, I spent a significant amount of time trying to organize the project ensuring that we get off on the right track. I did the initial project setup, configuration, designs and coordination of all team meetings.

There was a lot of excitement during FoundIT’s inception.

Members were engaged in the Slack group and participating in weekly meetings but as time went on, I started to sense that the excitement was slowly tapering off. Each week, some members would cancel last minute or be “no shows” at our weekly meetings, not completing tasks or just simply no longer participating. This was disheartening to say the least as the team lead and during this time period I was contemplating whether I should drop the entire project. However there were still a few members who still showed enthusiasm and that was enough of a sign for me to keep on moving forward with the project.

In retrospect there were certain factors I didn’t consider at the time. I live in Canada but there were some members that were located in completely different time zones. This proved to be challenging when trying to arrange an appropriate time for meetings that would be convenient for all team members especially the ones that were living across the world.

Another element that may have hindered FoundIT’s progress was the personal obligations that certain members had to fulfill. I was able to dedicate full time hours to the project whereas other members were still students, had full time jobs or had families. Some members were only able to dedicate X amount of hours per week and this may have caused certain tasks to be completed longer than expected and when working in a team environment this can become a major blocker for others.

But aside from all the setbacks that I may have occurred during the entire process, I still received a lot of support and encouragement from the FoundIT team and Project Unicorn members. FoundIT members who were no longer able to contribute kindly left me some valuable feedback before they departed. They mentioned to me how they had learned so much in such a short amount of time. Some users who had never even heard of CI/CD before was now able to explain what it does, what purpose it serves and how to configure a CI/CD pipeline.

I'm going to treat this as a valuable learning experience and I will continue to learn and improve myself as a developer and a leader when working on future projects.

### How Project Unicorn Has Helped

One of the advantages of being part of Project Unicorn is the community. We are all here to support each other. Project Unicorn is a place where we foster learning and growth. There are so many knowledgeable and experienced developers ranging from front-end, back-end, devops and project management. Their expertise helped me during FoundIT's development and without their help and guidance I don’t know if I would have had the energy and motivation to continue on. Project Unicorn is still a new community and we are growing every single day.

Whether you’re a beginner who wants to move away from tutorials or that seasoned veteran who’s been building projects for 10 plus years, Project Unicorn is a great community to be part of.

If you would like to learn more about Project Unicorn then check out these related blog posts

- [Project Unicorn UI](/blog/project-unicorn-ui/)
- [Contributing Part I: Getting Started](/blog/contributing-part-i-getting-started/)

If you would like to receives important news and updates, you can **subscribe** to our mailing list (down in the footer).
