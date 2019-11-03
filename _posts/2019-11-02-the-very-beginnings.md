---
layout: post
title:  "The Very Beginnings!"
date:   2019-11-02 10:45:30 -0400
categories: update
---
A long time ago, in a home far far away, Tyler Hostler-Mathis wanted to use his programming knowledge to create something he had never done before, a 3D game. This post will take you on a journey through the first big project that I ever took on!

After watching an amazing video by Sebastian Lague approached random cave generation with cellular atomata, I was instantly interested in creating a "dungeon crawler"esque game, and thus the project began. But enough talking about why I started this project, lets see it!

As mentioned above, I began with random cave generation using a method first introduced to me by Sebastian Lague, cellular automata. The concept is incredibly simple, and works beautifully. The code revolves around a two dimensional array of randomly generated walls. The psuedocode goes as follows.

{% highlight c %}
for (every value in 2d array)
	randomize value (0 or 1)

for (every level of smoothing)
	for (every value in 2d array)
		if (more than 4 neighbors)	// neighbors are located
			value = 1		// in a 3x3 grid around value
		else
			value = 0
{% endhighlight %}

![Cave generation](/assets/the-very-beginnings/randCave.gif)
