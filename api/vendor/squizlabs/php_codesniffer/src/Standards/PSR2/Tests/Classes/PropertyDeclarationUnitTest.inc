<?php
class MyClass
{
    public $var = null;
    protected $var = null;
    private $var = null;
    $var = null;

    var $var = null;
    static $var = null;
    public var $var = null; // Parse error.

    public $_var = null;
    protected $_var = null;
    private $_var = null;

    public $foo, $bar, $var = null;
    public $foo,
           $bar,
           $var = null;

    protected
        $foo,
        $bar;
}

class foo
{
    const bar = <<<BAZ
qux
BAZ;
}

class ABC {
    public static $propA;
    protected static $propB;
    private static $propC;
    static public $propD;
    static
        protected
            $propE;
    static private    /*comment*/   $propF;
}

class MyClass
{
    public string $var = null;
    protected ?Folder\ClassName $var = null;

    var int $var = null;
    static int $var = null;

    private int $_var = null;

    public $foo, $bar, $var = null;
    public ?string $foo,
           $bar,
           $var = null;

    protected
    array
        $foo,
        $bar;
}

class MyClass
{
    public string$var = null;
    protected ?Folder\ClassName
        $var = null;
    public int   $var = null;
    public static int/*comment*/$var = null;
}

class ReadOnlyProp {
    public readonly int $foo,
        $bar,
        $var = null;

    protected readonly ?string    $foo;

    readonly array $foo;

    readonly public int $wrongOrder1;

    readonly protected ?string $wrongOrder2;
}

class FinalProperties {
    final public int $foo,
        $bar,
        $var = null;

    final protected (D|N)|false  $foo;
    final array $foo;
    public FINAL ?int $wrongOrder1;
    static protected final ?string $wrongOrder2;
}
