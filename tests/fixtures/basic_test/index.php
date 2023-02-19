<?php

require 'vendor/autoload.php';

use \MyProject\PackageA\Foo;

$aFoo = new Foo();

$aFoo->Yo();

$cFoo = new \MyProject\PackageC\Foo();