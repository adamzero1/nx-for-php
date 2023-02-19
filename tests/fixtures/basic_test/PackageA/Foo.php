<?php
namespace MyProject\PackageA;

use MyProject\PackageB\Foo as BFoo;

class Foo {
 
    public function Yo(){
        echo 'AAAA';
        $bFoo = new BFoo();
    }
}