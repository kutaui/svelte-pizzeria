<div align="center">
<h1>Pizzeria</h1>

[Live](https://beemusic.kutaybekleric.com/)

<h3>Svelte 5 with form actions & Runes. 0 API routes.</h3>
</div>

![Landing Page](./static/landing.png)

# Introduction

Pizzeria is a SvelteKit app that allows users to order their favorite dishes. The app also
includes an in-depth admin panel for the restaurant owners to manage their orders, dishes and
users. The app is made with 0 API routes and only uses form actions and the new Svelte runes.

## Tech Stack

- SvelteKit
- PostgreSQL
- AWS S3 Bucket
- TailwindCSS
- Typescript & Zod
- Drizzle

## Features

- <b>Customize Profile</b> <br>

Users can edit their profile and upload a profile picture.

- <b>Admin Dashboard</b><br>

Admins have a dashboard which they can add/edit or remove dishes,users and check their orders.
Currently, there is no way for you to test this so I added some images of the admin panel at the
end.
Maybe
I can add a demo account with fake_admin privileges in the future.

- <b>Writing Pure SQL with Drizzle</b> <br>

While Drizzle has its own ORM, I decided to write my own SQL queries for the project to have a
better understanding of the database and to have more control over the queries.

- <b>AWS S3 Bucket</b> <br>

Both the profile pictures and the dish pictures are stored in an S3 bucket.

- <b>JWT Authentication</b> <br>

## Images

### Categories

![Admin Dashboard, Categories](./static/categories.png)

### Products

![Admin Dashboard, Products](./static/products.png)

### Edit Product

![Admin Dashboard, Edit Product](./static/edit_product.png)

### User Management

![Admin Dashboard, Users](./static/users.png)

