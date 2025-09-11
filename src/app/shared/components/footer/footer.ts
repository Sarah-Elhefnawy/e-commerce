import { Component, inject } from '@angular/core';
import { MyTranslateService } from '../../../core/services/translateService/my-translate-service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  public _MyTranslateService = inject(MyTranslateService)
}
