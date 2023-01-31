let changes = [];

        $('input[name=Service]').on('change', function () {
            const data = $('input[name=Service]:checked').val();

            changes.forEach((change) => {
                document.getElementById(change.to).id = change.from;
            });
            changes = [];

            if (data === 'homeloan') {
                document.getElementById('homeloan-step-6').id = 'step-6';
                document.getElementById('step-8').id = 'step-7';
                document.getElementById('property-step-5').id = 'step-5';
                changes.push(
                    {
                        from: 'property-step-5',
                        to: 'step-5'
                    }
                );
                changes.push(
                    {
                        from: 'homeloan-step-6',
                        to: 'step-6'
                    }
                );
                changes.push(
                    {
                        from: 'step-8',
                        to: 'step-7'
                    }
                );
                
            }
            else if (data === 'refinance') {
                document.getElementById('refinance-step-6').id = 'step-6';
                document.getElementById('step-8').id = 'step-7';
                document.getElementById('property-step-5').id = 'step-5';
                changes.push(
                    {
                        from: 'property-step-5',
                        to: 'step-5'
                    }
                );
                changes.push(
                    {
                        from: 'refinance-step-6',
                        to: 'step-6'
                    }
                );
                changes.push(
                    {
                        from: 'step-8',
                        to: 'step-7'
                    }
                );
            }
            else if (data === 'reverse_mortgage') {
                document.getElementById('homeloan-step-6').id = 'step-6';
                document.getElementById('step-8').id = 'step-7';
                document.getElementById('property-step-5').id = 'step-5';
                changes.push(
                    {
                        from: 'property-step-5',
                        to: 'step-5'
                    }
                );
                changes.push(
                    {
                        from: 'homeloan-step-6',
                        to: 'step-6'
                    }
                );
                changes.push(
                    {
                        from: 'step-8',
                        to: 'step-7'
                    }
                );
            }
            else if (data === 'home_improvement') {
                document.getElementById('property-step-5').id = 'step-9';
                document.getElementById('home-improvement-step-6').id = 'step-5';
                document.getElementById('home-improvement-step-7').id = 'step-6';
                document.getElementById('step-8').id = 'step-7';
                changes.push(
                    {
                        from: 'property-step-5',
                        to: 'step-9'
                    }
                );
                changes.push(
                    {
                        from: 'home-improvement-step-6',
                        to: 'step-5'
                    }
                );
                changes.push(
                    {
                        from: 'home-improvement-step-7',
                        to: 'step-6'
                    }
                );
                changes.push(
                    {
                        from: 'step-8',
                        to: 'step-7'
                    }
                );
            }
            else if (data === 'home_warranty') {
                document.getElementById('homeloan-step-6').id = 'step-6';
                document.getElementById('step-8').id = 'step-7';
                document.getElementById('property-step-5').id = 'step-5';
                changes.push(
                    {
                        from: 'property-step-5',
                        to: 'step-5'
                    }
                );
                changes.push(
                    {
                        from: 'homeloan-step-6',
                        to: 'step-6'
                    }
                );
                changes.push(
                    {
                        from: 'step-8',
                        to: 'step-7'
                    }
                );
            }

        });

