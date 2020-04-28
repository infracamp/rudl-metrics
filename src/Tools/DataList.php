<?php


namespace Rudl\Tools;


class DataList
{

    public $data;

    public function __construct(array &$arr)
    {
        $this->data =& $arr;
    }


    public function select($key) : self {
        if ( ! isset ($this->data[$key]))
            $this->data[$key] = [];
        return new self($this->data[$key]);
    }

    public function set($key, int $value) {
        $this->data[$key] = $value;
    }

    public function inc($key, int $incBy)
    {
        if (! isset($this->data[$key]))
            $this->data[$key] = 0;
        $this->data[$key] += $incBy;
    }
}
