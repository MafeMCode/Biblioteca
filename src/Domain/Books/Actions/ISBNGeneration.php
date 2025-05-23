<?php

namespace Domain\Books\Actions;

class ISBNGeneration
{
    public function __invoke(string $title, string $author, string $editor)
    {

        // Title number gen

        $title = strtolower($title);

        $title = preg_replace('/[^a-z0-9]/', '', $title);

		$numTitle = 0;

        for ( $pos=0; $pos < strlen($title); $pos ++ ) {
            $byte = substr($title, $pos);
            $byte = ord($byte);
            $numTitle += $byte;
        }

        $numTitle = substr(strval(intval($numTitle)), -3);

        $ISBNTitle = $numTitle;

        // Author number gen

        $author = strtolower($author);

        $author = preg_replace('/[^a-z0-9]/', '', $author);

		$numAuthor = 0;

        for ( $pos=0; $pos < strlen($author); $pos ++ ) {
            $byte = substr($author, $pos);
            $byte = ord($byte);
            $numAuthor += $byte;
        }

        $numAuthor = substr(strval(intval($numAuthor)), -3);

        $ISBNAuthor = $numAuthor;

        // Editor number gen

        $editor = strtolower($editor);

        $editor = preg_replace('/[^a-z0-9]/', '', $editor);

		$numEditor = 0;

        for ( $pos=0; $pos < strlen($editor); $pos ++ ) {
            $byte = substr($editor, $pos);
            $byte = ord($byte);
            $numEditor += $byte;
        }

        $numEditor = substr(strval(intval($numEditor)), -3);

        $ISBNEditor = $numEditor;

        $ISBN = '9784'.$ISBNTitle.$ISBNAuthor.$ISBNEditor;

        return $ISBN;
    }
}
