This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the development server 
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Tailwind

Styled using Tailwind CSS
## Deployed automatically on Vercel

Deployed automatically from `main` branch with Vercel on domain

## Database 
database is at [https://james-backend.herokuapp.com/admin](https://james-backend.herokuapp.com/admin)

## photo sizing 
thumbnails 1120px x 1140px - borders on the side
## TODO
- seo
- comb through photos and ensure sizing 
- feature event on the page
- washing machine 
- sitting on the page for 45 seconds with no interaction
- first thing second thing third
- adding timing to switcharoo this
- washing machine as loading symbol:
  -main page and on [year] page
- series is not sorting properly
- look for the catoglue in the new format 

admin / James stuff: 
- create james log in for strapi
- add gmail somewhere 
- should add series information? on information page
- information page optional - when does this happen?

catalogues (pamphlets), 
essays,
entries books,
reviews

catalogue front and center
-look at biblio entries

, Edition of 16, 13 bands per box

exhibition and collectors can come later

-jalousie
  -jalousie (roman), 2008, Art Gallery of Ontario


Mug short
-vanity search, 2023

-Recent vs Work

-work automatically opens date tab


-OPTION for selecting what is on the homepage

-balcony:
  -LOOK INTO ross sinclair not being the correct link
  -corriane is broken on balcony

-on all work, group work by series for images. each work / series will have its own line and works with a series will take up an entire line and possibly spill over. there could also be some sort of folder opening. 
-Also want to add the option to switch between title and images on work page

-add shows to navigation, -look into exhibition stuff - add link to the gallery around the image
-add mug shots back in too

-don't hide the rotator button on the homepage, bring it up so it is visible right below the image

-add review to homepage

-fix focus state of input, especially content font



List of priorities
- photo distortion weirdness (old image appearing stretched before new image loads)
- font changes
- carousel images?
- side artwork viewer
  - align on what should be in here 
- Accordion history linking on decade page
- Accordion history linking on work title page
- alias and series folder stuff 
- dynamic homepage where james can change content 
- media 
  - this is so far out of scope 


- would it be better to use something where james can go in and re-arrange things?



When clicking on content in 2020’s decade we want to see ONLY content artworks from
2020 not entire content series (spanning multiple decades).
We only want to see all content artworks when we click “alias” folder, (with the possibility
of that alias folder showing up more than once in the chain of folders)
Basically, I guess I’m still having trouble with the functionality of the top right corner
scroll button—I think it can be eliminated for the most part. Especially if we can do a left
right scroll through of enlarged images (see above Image Viewing)

Alias folders
For multiple decade works, I think we can just go with the “alias” folder, drop the other
greyed out alternate decade folders
Standardize this for all series: jalousie, thing’s end, Reservoirs, content
In series/alias folders all artworks should be organized chronologically most to least
recent, top to bottom

In Reservoirs folder with all Reservoir works, ’96 Cadillac DeVille is missing.
Reservoir (’96 Cadillac DeVille) is also missing from 2010 decade folder even though it
is published in the strapi backend of site.
Backend images of Spindle #1 and #3 not showing up on front of site. Does site need to
be updated regularly when new info is added to backend? Can we update it?


DOING
- get rid of series additional decades in date page, just show alias 
  - add date span to alias folder
  - series title on series page with date span at top
  - clicking on item in series opens up side panel
- getting rid of artwork page for now
- all information in the side panel
- image distortion 
- reducer size of Gifs 


FUTURE
- Publishing Problem 
- carousel of ONLY IMAGES IN ARTWORKS
- date and name of the piece in carousel 
- dynamic homepage where james can change content

DONE 
- site under construction 