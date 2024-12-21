const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setResponseMessage('');
  if (!validateForm()) return;

  setLoading(true);

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    console.log("API Key from Env (in handleSubmit):", apiKey); // This will work after you fix the export

    const response = await axios.post(
      'https://souldialogue.top/send-to-telegram', // Your Cloudflare Worker route
      formData, // Send the form data
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        withCredentials: true,
      }
    );

    console.log('Success:', response.data);
    setResponseMessage('Сообщение успешно отправлено!'); // Success message
    setFormData({ name: '', phone: '', message: '' }); // Clear the form
  } catch (error: any) {
    console.error('Error sending message:', error);
    setResponseMessage('Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.'); // Error message
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  } finally {
    setLoading(false);
  }
};
