# A Better Spreadsheet

Numerical models are a useful tool that help people and busineseses understand
complex systems. The standard tool for building these models is the spreadsheet:
Microsoft Excel, Google Sheets, Apple Numbers. The basic idea of the spreadsheet
is a powerful one: a graph of values and calculations where updating the inputs
automatically updates the outputs. And yet the ability to build good commercial
models is seen as a dark art in most companies, with that one Excel guru who
understands the model becoming the bottle neck for working with it.

1. Not every thing fits in a table

Spreadsheets are designed for tabular data – rows of data with the same columns,
or properties. Building models in a spreadsheet requires users to identify
conceptual similar "objects" to group into tables. The benefit of building
models in this way is that calculations can be performed in aggregate – sum this
column, multiply this column by that one and add three. This greatly reduces the
posibility of error, as one calculation can be applied to all rows.

Even experienced users struggle to model certain types of data in this way. An
example: when modeling the cloud resources required to host a software platform,
the quantity of each of those resources might be calculated in a completely
different way - a fixed number of this instance type, one of this instance type
per X thousand users, X gigabytes of attached storage per all of the instances
above. To make matters worse, cloud resources are often priced in somewhat
complex ways: X USD per instance hour, X USD per GB-Month of storage, X per GB
for the first 100 GB of bandwidth, Y for the next 1000 GB. It is certainly
possible to model all of these things in a spreadsheet, but doing so in an
organised, maintainable way is time consuming and error prone. I beleive that we
can do better.

2. Formulas are broken

Cells in a spreadsheet can either be a value or a formula. A value is fixed, and
entered or copied into the spreadsheet by hand. A formula performs calculations
by referencing the values of other cells and passing them into functions (add,
substract, total, min, max, etc.) Formulas are what give spreadsheets their
flexibility, as someone with an understanding of how something is calculated in
real life can generally find a way to represent that using the functions
provided.

Problems arise, however, when a business needs to rely on a model from a domain
they do not understand. An engineer might undertstand what this calculation is
doing, but no one else will:

= C29 / 8 / 1000 _ C25 _ 60 _ 60 / 100 _ C30

The first problem are all the references: what do those cells contain, and what
is the meaning of that value in this context? The next problem is all of these
unamed constant values – what are they, and what are they doing to transform one
value into another?

Some of these issues can be solved with named ranges, as they make formulas
easier to read:

= video*hours_per_month * hours*to_seconds * video_bitrate_mbps \*
megabits_to_gigabytes

This is much better, but requires work and forethought by the person building
the model. Also, why should a user have to worry about unit conversions? Surely
a spreadsheet can work out how to get from hours to seconds and megabits to
gigabytes:

GB = video_hours_per_month \* video_bitrate_mbps

3. Calculations are decentralised

Calculations in a spreadsheet can occur anywhere, and in a complex model the
number of inputs to a single cell can be very high. This makes auditing the
correctness of a model a time-consuming process and contributes to the
reluctuance of users to make changes – it's not clear what effects changing a
cell might have without carefully understanding its inputs and outputs.

We can do better on two fronts here: centralising and naming common calculations
and making auditing straightforward.

Centalising the key inputs to a model is something experienced Excel users do
from experience. So why not make it a default and improve the user experience? A
central listing of named parameters in a model, with optional descriptions where
each parameter is either a constant or a calculation made from other parameters
and constants. Optional descriptions help other users understand the reasoning
behind the calculations, and navigating between parameters is as simple as
clicking on their name.

Improving the auditing experience simply means making it easy to understand all
the inputs to a given calculation. This is useful on two fronts: firstly when
working the model it is easier for users to understand how calculations are
being made, and how changes will affect the outputs. Secondly when generating
outputs to other platforms or visual presentation, it is simple to choose the
level of detail required: from every calculation listed out in a table, to a
single grand total, and everything in between.

4. Mixing presentation with caculation

5. Modelling hierarchical or modular concepts is complex

6. Modelling time is left to the user
