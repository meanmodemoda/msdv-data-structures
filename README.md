# Introduction
This is an ongoing documentation of my course progress of Data Structures taken during my study at Parsons' Data Visualization MS porgram in Fall 2021.

# Current Progress

Week 1 - set up github repo and learn to fetch html files and store them locally using Node.js `got` method.


## Weekly Assignment 1

In this week, I learned to use Node.js `got` method to fetch html body content and save it into a txt file.
We need to loop through 10 html pages and create 10 separate txt files.

In my code, I attemped to address the efficiency and scalability of the project especially related to filling 0s in the naming convension. 
If we have 10 files, we name 1st file *"01"*, 2nd file *"02"*...10th file *"10"*. What if we have 1,000 files? We will name 1st file *"0001"*, 99th file *"0099"* and 876th file *"0876"*.

The naming of the files depends on the total number of files as well as the sequence of the files themselves. 

I created a function that evaluates the total count of digits of the number of files we need to loop through and the digit count of individual files' sequence to determine their filenames.


### Assignment Details

1. Create a function`getLength` that counts the digit of the number of files that need to be looped through.
2. Create a function `zeroFilled` that returns an array of filename variables. For instance, if we have 100 files, the array will be `[001,002,003....,098,099,100]`.
3. Loop through the html links and save the body content into separate txt files leveraging the `zeroFilled` function. I created template literals for both url link name and file name by referencing the array created in `<zeroFilled>`.

