PageKit
=======

Version 1.2 - Source available on [GitHub](http://github.com/fjoachim/pagekit).

Copyright 2010 Joachim Fornallaz. All rights reserved.


Introduction
------------

PageKit is a set of JavaScript classes based on [Prototype](http://www.prototypejs.org/) which provide features like menus and lists.

PageMenu
--------

PageMenu is a JavaScript Class which allows you to add menus to a html page. It is completely unobtrusive and requires one JavaScript- and one CSS-file to be included.

### Features

* Use of semantically correct HTML code
* Arbitrary numbers of menu-bars and menus
* Menus are displayed when clicking on or hovering over a menu title
* An open menu is closed if the mouse has left the menu for a certain amount of time
* Visual feedback when mouse is hovering over menu-title
* Each menu can have a different visual style
* Works with Firefox 1.x, Safari 2.x and IE 6.0

### Usage

Copy javascripts/pagemenu.js and stylesheets/pagemenu.css to your website. Also, make sure that Prototype is present. 

Include both file in the HTML header of the page you want to be using PageMenu:

    <link rel="stylesheet" media="screen" type="text/css" href="stylesheets/pagemenu.css">
    <script src="javascripts/prototype.js" type="text/javascript"></script>
    <script src="javascripts/pagemenu.js" type="text/javascript"></script>
    
Create following structure for a menu-bar:

    <ul class="menubar">
       <li>
          <a class="menutitle" href="#">Home</a>
       </li>
       <li>
          <label for="editmenu" class="menutitle">Edit</label>
          <ul id="editmenu" class="menu">
             <li><a href="#">Copy</a></li>
             <li><a href="#">Cut</a></li>
             <li><a href="#">Paste</a></li>
          </ul>
       </li>
    </ul> 

This menu-bar consists of one title without a menu and a second title having a menu attached. It is important to use the same element classes as shown in this example. 

For adding a custom style, add a CSS class to first-level LI elements like this: 

    <ul class="menubar">
       <li class="special">
          <label class="menutitle">File</label>
          <ul class="menu">
             <li><a href="#">New</a></li> 
             <li><a href="#">Open</a></li>
             <li><a href="#">Save</a></li>
             <li><a href="#">Save As...</a></li>
          </ul>
       </li>
    </ul>

PageList
--------

With PageList, you can define lists which have selectable elements. Select several elements using modifier keys, such as shift to select ranges or control/command to select individual elements.