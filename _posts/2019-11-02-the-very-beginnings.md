---
layout: post
title:  "The Very Beginnings!"
date:   2019-11-02 10:45:30 -0400
categories: update
---
A long time ago, in a home far far away, Tyler Hostler-Mathis wanted to use his programming knowledge to create something he had never done before, a 3D game. This post will take you on a journey through the first big project that I ever took on!

After watching an amazing video by [Sebastian Lague](https://www.youtube.com/channel/UCmtyQOKKmrMVaKuRXz02jbQ) approached random cave generation with cellular atomata, I was instantly interested in creating a "dungeon crawler"esque game, and thus the project began. But enough talking about why I started this project, lets see it!

<h1> Random Cave Generation </h1>
![Cave generation](/assets/the-very-beginnings/randCave.gif)

As mentioned above, I began with random cave generation using a method first introduced to me by Sebastian Lague, cellular automata. The concept is incredibly simple, and works beautifully. The code revolves around a two dimensional array of randomly generated walls. The psuedocode goes as follows.

{% highlight c %}
for (every value in 2d array)
	randomize value (0 or 1)

for (every level of smoothing)
	copy 2D array to buffer
	// buffer necessary to remove diagonal bias on smoothing
	for (every value in 2D array)
		if (more than 4 neighbors) // neighbors defined by 3x3 space
			bufferValue = 1
		else if (exactly 4 neighbors)
			bufferValue = 2D array value
		else
			bufferValue = 0
	copy buffer to 2D array
{% endhighlight %}

<h2> Marching Squares </h2>
![Marching Squares](/assets/the-very-beginnings/marchingSquares.gif)

After random cave generation was tackled, it was time to smooth out those hard edges with a marching squares algorithm, again, inspired by [Sebastian Lague](https://www.youtube.com/channel/UCmtyQOKKmrMVaKuRXz02jbQ). Marching squares is a very common and useful algorithm. The psuedocode is detailed below.

{% highlight c %}
separate every 2x2 block of values into its own "cell"
for (every "cell")
	use the values of the four corners to build-
	a 4 bit binary value (top left clockwise)

	lookup binary value in table, and apply the rule
{% endhighlight %}

The lookup table for a marching squares application might look like this (Wikipedia):
![Lookup Table](/assets/the-very-beginnings/lookupTable.jpg){: .center-image }
