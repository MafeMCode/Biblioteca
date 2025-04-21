<?php

namespace App\Notifications;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class confirmacion_reserva extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        //preguntar por parametros!!!!!!!!!!!

        $user_reservas = $notifiable->reservations->pluck('book_id');

        $book_id = Loan::orderBy('updated_at', 'desc')->whereIn('book_id', $user_reservas)->first()->book_id;

        $title = Book::find($book_id)->title;

        return (new MailMessage)
                    ->line('¡Hola '.$notifiable->name.'!')
                    ->line('¡Es tu turno para poder leer '.$title.'!')
                    ->action('Ven a reservarlo', url('/books'))
                    ->line('¡No tardes!');

    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
